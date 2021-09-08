const fs = require('fs')
const xlsx = require('xlsx')
const __csvFileDir = "./parsed_data"
const {spawn} = require('child_process')

exports.getData = (req, res) => {
    const dir = req.body.dir
    const date = req.body.date

    if(!dir || !date){
        res.status(400).json({
            error: "Please input all the required information"
        })
    }
    else{
        const pyScript = spawn('python', ['./saledata_to_mysql.py', dir])
        pyScript.stdout.on('data', (data)=>{
            //console.log('Received data: '+data.toString())
            res.status(200).json({
                result: 'Received data: '+data.toString()
            })
        })
    }
}

exports.toCsv = (dir, fPre, fName, fExtension) => {
    var readFileObj = xlsx.readFile(dir + '\\' + fName + '.' + fExtension)
    var csvFile = fPre+"_"+fName+".csv"
    xlsx.writeFile(readFileObj, __csvFileDir+'/'+csvFile, {bookType: "csv"})
}