var request = require('request');

var headers = {
    'authority': 'ide.geeksforgeeks.org',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'x-requested-with': 'XMLHttpRequest',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://ide.geeksforgeeks.org',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://ide.geeksforgeeks.org/pEBe2lm10N',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cookie': '__ssds=2; __gads=ID=bd1d5bc0ad6c04e0:T=1592754870:S=ALNI_Mb6HwUyBygcrS2eLIZw4KO3rItZmQ; __ssuzjsr2=a9be0cd8e; __uzmaj2=f5b52184-177c-4a4e-9039-385a60e95eb0; __uzmbj2=1592754875; default_lang=cpp; g_state={"i_p":1601641036206,"i_l":4}; _ga=GA1.2.331493803.1592675008; _fbp=fb.1.1600530412159.29834049; __utma=245605906.331493803.1592675008.1601537203.1601921080.32; __utmz=245605906.1601921080.32.28.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __uzmcj2=7317119066430; __uzmdj2=1601921132; RT="z=1&dm=geeksforgeeks.org&si=emn39t3g8pn&ss=kfwug80d&sl=0&tt=0"; _gid=GA1.2.1103164800.1602170702; G_ENABLED_IDPS=google; authtoken=c7c410b74e2ed5528fbfdc12bb913639; g_state={"i_p":1604592514969,"i_l":4}'
};

var dataString = 'lang=Cpp14&code=%23include+%3Ciostream%3E%0Ausing+namespace+std%3B%0A%0Aint+main()+%7B%0A++++int+x%3B%0A++++cin%3E%3Ex%3B%0A%09cout%3C%3C%22GfG\u0021%22%3C%3Cx%3C%3Cendl%3B%0A%09return+0%3B%0A%7D&input=0&save=false';

var options = {
    url: 'https://ide.geeksforgeeks.org/main.php',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);
        dataString = 'sid='+obj.sid+'&requestType=fetchResults';
        var optionss = {
            url: 'https://ide.geeksforgeeks.org/submissionResult.php',
            method: 'POST',
            headers: headers,
            body: dataString
        };
        function callbackk(error, response, body) {
          var stat =JSON.parse(body);
            if (!error && response.statusCode == 200) {
                if(stat.status == "IN-QUEUE"){
                  request(optionss, callbackk);
                }
                else{
                console.log(stat.output);
              }
            }
        }
        request(optionss, callbackk);
    }
}


request(options, callback);
