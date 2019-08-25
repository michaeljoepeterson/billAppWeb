export const normalizeResponseErrors = res => {
    if (!res.ok) {
        if (
            res.headers.has('content-type') &&
            res.headers.get('content-type').startsWith('application/json')
        ) { 
            //Deal with errors returned from server
            return res.json().then(err => Promise.reject(err));
        }
        //deal with errors not coded on the server side
        return Promise.reject({
            code: res.status,
            message: res.statusText
        });
    }
    return res;
};

export const getVotes = (bills,legIndex,url,data) => {
    if(data === undefined){
        data = [];
    }
    
    let promise = new Promise((resolve,reject) => {
        
        //console.log('length vote',legIndex,bills.length);
        if(legIndex >= bills.length){
            resolve(data);
        }
        let currentLegId = bills[legIndex].legisinfo_id;
        //console.log('getting vote',legIndex,currentLegId);
        let newUrl = url + '/vote?legid=' + currentLegId;
        fetch(newUrl, {
            method:'GET'
        })
        .then(data => {
            //console.log('data before json: ',data);
            return data.json()
        })

        .then(voteData => {
            //console.log('data after json: ',voteData);
            data.push(voteData.vote[0]);
            if(legIndex < bills.length){
                resolve(getVotes(bills,legIndex + 1,url,data))
            }
            else{
                resolve(data);
            }
        })

        .catch(err => {
            console.log('error getting votes',err,legIndex,currentLegId);
            reject(err);
        })
    })

    return promise;
}