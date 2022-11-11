import { analyzer } from './analyzer'
import * as fs from 'fs'
import { Worker } from 'worker_threads'

const totalResults: any = { }

fs.readdir('data', async (err, files) => {  
  Promise.all(files.map(file => analyzer(`data/${file}`))).then((data) => {
    data.forEach((res: any) => {
      for (const [key, value] of Object.entries(res)) {
        if(totalResults[key]) totalResults[key] += value
        else totalResults[key] = value
      }
    })
    
    for (const [key, value] of Object.entries(totalResults)) {
      console.log(`${key}: ${value}`)
    }
  });
})
