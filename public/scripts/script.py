import json
from Bio.Seq import Seq


async def main(input):
    if not input:
        input = "No input"
    my_dna = Seq(input)

    output = str(my_dna.reverse_complement())
    return json.dumps({"output": output, "input": input})
