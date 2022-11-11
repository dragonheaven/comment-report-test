import * as fs from "fs";
import * as readline from "readline"

export const metrics = [
  {
    key: 'SHORTER_THAN_15',
    fieldName: 'Shorter than 15 chars',
    validate: (comment: string) => {
      return comment.length < 15
    }
  },
  {
    key: 'MOVER_MENTIONS',
    fieldName: 'Mover mentions',
    validate: (comment: string) => {
      return comment.toLowerCase().includes("mover")
    }
  },
  {
    key: 'SHAKER_MENTIONS',
    fieldName: 'Shaker mentions',
    validate: (comment: string) => {
      return comment.toLowerCase().includes("shaker")
    }
  }
]


export const analyzer = async (file: string) => {
  const res : any = {}
  try {
    const fileStream = fs.createReadStream(file);

    const lines = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity  // break by \r\n
    });
  
    for await (const line of lines) {
      metrics.forEach((metric: any) => {
        if(metric.validate(line)) {
          if(res[metric.key]) res[metric.key]++
          else res[metric.key] = 1
        }
      })
    }
  } catch(err) {
    console.log(err)
  }

  return res
}