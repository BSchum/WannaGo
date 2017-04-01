var router = require('express').Router();
var http = require('https');
router.post("/",function(req,res){
    PostKLMApi(req,res);
});

function PostKLMApi(req,res){
    var information = {
        origin:req.body.origin,
        destination:req.body.destination,
        departureDate:req.body.departureDate
    };
    var data =
    {
        cabinClass:"ECONOMY",
        discountCode:"",
        passengerCount:{
            YOUNG_ADULT:1,
            INFANT:0,
            CHILD:0,
            ADULT:2
        },
        currency:"EUR",
        minimumAccuracy:"",
        requestedConnections:[
            {
            origin:{
                airport:{
                code:information.origin
                }
            },
            destination:{
                airport:{
                code:information.destination
                }
            },
            departureDate:information.departureDate
            }
        ],
        shortest:false     
    };
   var options = {
       hostname:'api.klm.com',
       path:'/opendata/flightoffers/available-offers',
       method:'POST',
       headers: {
            'Afkl-Travel-Country':'NL',
            'Accept':'application/hal+json;profile=com.afklm.b2c.flightoffers.available-offers.v1;charset=utf8',
            'Afkl-Travel-Host':'KL',
            'Accept-Language':'en-US',
            'Api-Key':'cejm8dakc66hmga7bw5m6aqp',
            'Content-Type':'application/json'
        },
    };
    
    var req = http.request(options, (resR)=>{
        var data;
        resR.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
           
            data += chunk;
        });
        resR.on('end', () => {
            console.log('No more data in response.');
            res.send(data);
        });
        
    });
    req.write(JSON.stringify(data));
    req.end();
}


module.exports = router;
