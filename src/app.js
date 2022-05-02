import React from 'react'
import { createRoot } from 'react-dom/client';
import 'normalize.css/normalize.css';
import './styles/styles.scss'
import Header from './components/Header';
class RevComp extends React.Component {
    
    constructor(props){ 
        super(props)
        this.state = {}         
    }   

    loadPython = async () => {
      try {
        let pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/' })
        await pyodide.loadPackage(['biopython'])
        const version = await pyodide.runPythonAsync(`
        import sys
        sys.version
        `)
        this.setState({ version, pyodide })
        const response = await fetch('/scripts/script.py')
        const script = await response.text() 
        await pyodide.runPythonAsync(script)
        const mainPy = await this.wrapScript(pyodide)
        this.setState({mainPy})
      }  catch (e) {
        console.log(e)
      }
    }

    componentDidMount() {
      this.loadPython()
    }

    wrapScript = (pyodide) => {
      const func = pyodide.globals.get('main')
      console.log("func")
      console.log(func)
      
      return async (input) => {
        console.log('input:' + input)
        const obj = await func(input)

        console.log('output:' + obj)

        if (obj){
          const results = JSON.parse(obj)
          // obj.destroy() 
          return results
        }
        return 'nothing from py ' 
      }
    }

    

    updateSeq = (e) => (this.setState({seq: e.target.value}))

    runSomething = async (e) => {
      const { seq, mainPy} = this.state
      if (mainPy){
        console.log("mainPy")
        console.log(mainPy)
        const transeq = await mainPy(seq)
        console.log('transeq')
        console.log(transeq)
        this.setState({transseq: transeq.output})
      }
    }

    render() {
        return (
            <div>
            <Header />
            <div className='container'>
              <h1>Reverse complement tool (using Biopython in Pyodide)</h1> 
              <h2>Paste nucleotide sequence here</h2>
              <div className="seq-field">
                <textarea id='seq-input' className="seq-field__input" name="seq" onChange={this.updateSeq}></textarea>
                <button id='submit-gbk' className="button" onClick={this.runSomething}>Submit Sequence</button>
              </div>
              <h3>Status - Do not try anything until script is ready.</h3>
              Python Status: {this.state.version && <p>Booted with {this.state.version}</p>}
              Script Status: {this.state.mainPy && <p>Script Ready</p>}
              <h2>Output</h2>
              <div className='output'>
                {this.state.transseq}
              </div>
            </div>
            </div>
        )
    }
    
}


const appRoot = createRoot(document.getElementById('app'))
appRoot.render(<React.StrictMode><RevComp /></React.StrictMode>)