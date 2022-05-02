// webworker.js

// Setup your project to serve `py-worker.js`. You should also serve
// `pyodide.js`, and all its associated `.asm.js`, `.data`, `.json`,
// and `.wasm` files as well:

if( 'undefined' === typeof window){
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");

}
let pyodideReady = false

async function setupPyodide() {
  
  try{
    // self.pyodide = await loadPyodide()
    // await self.pyodide.loadPackage(["numpy", "biopython"])
    // You can install custom python packages (as a pure python wheel)
  //   await pyodide.runPythonAsync(`
  //   import micropip
  //   await micropip.install('pyodide/trust_constr-1.0.0-py3-none-any.whl')
  // `);
    console.log('Python Ready')
    pyodideReady = true
  } catch(e) {
    console.error('Python loading failed.');
    console.error(e);
  }

}

const pyodideReadyPromise = setupPyodide();

self.onmessage = async (e) => {
  await pyodideReadyPromise;
  if (!pyodideReady) {
    postMessage("pyodide_not_available");
    return;
  }
  console.log('python ready')
  // const { id, python, ...context } = e.data
  // for (const key of Object.keys(context)) {
  //   self[key] = context[key];
  // }  
  // try {
  //   await self.pyodide.loadPackagesFromImports(python);
  //   let results = await self.pyodide.runPythonAsync(python);
  //   self.postMessage({ results, id });
  // } catch (error) {
  //   self.postMessage({ error: error.message, id });
  // }


}