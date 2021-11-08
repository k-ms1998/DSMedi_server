const fs = require('fs')
const xlsx = require('xlsx')
const __csvFileDir = "./parsed_data"
const {spawn} = require('child_process')
const {PythonShell} = require('python-shell')
const wHouseStart = [4,9]
const wHouseDst = [7,9]
const wHouseMap = [
                    [-1,-1,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,-1,0,-1,0,-1,0,-1,0,-1],
                    [0,-1,0,-1,0,-1,0,-1,0,-1],
                    [0,-1,0,-1,0,-1,0,-1,0,-1],
                    [0,-1,0,-1,0,-1,0,-1,0,-1],
                    [0,-1,0,-1,0,-1,0,-1,0,-1],
                    [0,0,0,0,0,0,0,0,0,-1],
                    [0,0,0,0,-1,0,0,-1,0,0]
                ]

exports.getData = (req, res) => {
    const dir = req.body.dir
    const date = req.body.date

    if(!dir || !date){
        res.status(400).json({
            error: "Please input all the required information"
        })
    }
    else{
        fs.access('./raw_data/'+dir+'/'+date+'.xlsx', (err) => {
            if(!err){
                spawn('python', ['./saledata_to_mysql.py', dir, date])
                    .stdout.on('data', (data)=>{
                        //console.log('Received data: '+data.toString())
                        res.status(200).json({
                            result: 'Received data: '+data.toString()
                        })
                    })
            }
            else{
                res.status(400).json({
                    error: 'Non-existent File'
                })
            }
        })
        
    }
}
exports.toCsv = (dir, fPre, fName, fExtension) => {
    var readFileObj = xlsx.readFile(dir + '\\' + fName + '.' + fExtension)
    var csvFile = fPre+"_"+fName+".csv"
    xlsx.writeFile(readFileObj, __csvFileDir+'/'+csvFile, {bookType: "csv"})
}

exports.calPath = async (req, res) => {
    //Input an array of coordinates
    //coodinate = [[x1,y1], [x2,y2], [x3,y3]...]
    var coor = req.body.coordiante
    if(!coor){
        res.status(400).json({
            error: "Please input all the coordinates"
        })
    }
    else{
        var firstP = []
        
        var wHouseW = wHouseMap[0].length
        var wHouseH = wHouseMap.length
        cMap = wHouseMap.slice() //Deep Copy
        await getDist([wHouseStart[0], wHouseStart[1]], cMap, wHouseW, wHouseH, 1)
        await console.log(cMap)
        var min = 100*100
        await coor.forEach(async(p) => {
            cDist = cMap[p[0]][p[1]]
            console.log(cDist)
            if(min > cDist){
                min = cDist
                firstP = p
            }
        })
    }
}
async function getDist(s, v, w, h, dist){
    // await console.log(s, d)
    // await v.forEach((vv) => {
    //     console.log(vv)
    // })
    // await console.log("=================")
    sx = s[0]
    sy = s[1]

    v[sy][sx] = dist

    if (sx-1 >= 0){
        if(v[sy][sx-1] == 0){
            await getDist([sx-1, sy], v, w, h, dist+1) 
        }
    }
    if (sy-1 >= 0){
        if(v[sy-1][sx] == 0){
            await getDist([sx, sy-1], v, w, h, dist+1) 
        }
    }
    if (sx+1 < w){
        if(v[sy][sx+1] == 0){
            await getDist([sx+1, sy], v, w, h, dist+1) 
        }
    }
    if (sy+1 < h){
        if(v[sy+1][sx] == 0){
            await getDist([sx, sy+1], v, w, h, dist+1) 
        }
    }

}