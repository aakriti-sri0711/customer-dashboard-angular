import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response } from '@angular/http';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiTalkService {

  constructor(public http:Http) { }
  getData(passed_url){
    
    return this.http
              .get(passed_url)
              .toPromise()
              .then(res => {
                // console.log(typeof res['_body'])
                res['json'] = JSON.parse(res['_body'])
                return res
              })
              .catch(Error => {
                  Error['json'] = JSON.parse(Error['_body'])
                  return Error
              });
  }

  putData(passed_url, data){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
               .put(passed_url, JSON.stringify(data), options )
               .toPromise( )
               .then(res => {
                  res['json'] = JSON.parse(res['_body'])
                  return res
                })
               .catch(Error => {
                  Error['json'] = JSON.parse(Error['_body'])
                  return Error
               });
  }

  postData(passed_url, data){
    let headers = new Headers({'Content-type' : 'application/json'});
    let options = new  RequestOptions({ headers: headers });
    return this.http
               .post(passed_url, JSON.stringify(data), options)
               .toPromise()
               .then(res => {
                  res['json'] = JSON.parse(res['_body'])
                  return res
               })
               .catch(Error => {
                  Error['json'] = JSON.parse(Error['_body'])
                  return Error
               });
  }

  deleteData(passed_url){
    let headers = new Headers({'Content-type' : 'application/json'});
    let options = new  RequestOptions({ headers: headers });
    return this.http
               .delete(passed_url, options)
               .toPromise()
               .then(res => {
                  res['json'] = JSON.parse(res['_body'])
                  return res
               })
               .catch(Error => {
                  Error['json'] = JSON.parse(Error['_body'])
                  return Error
               });
  }

  sendPdf(passed_url, data){
    let headers = new Headers();
    let options = new  RequestOptions({ headers: headers });
    return this.http
               .post(passed_url, data, options)
               .toPromise()
               .then(res => {
                  res['json'] = JSON.parse(res['_body'])
                  return res
               })
               .catch(Error => {
                  Error['json'] = JSON.parse(Error['_body'])
                  return Error
               });
  }


  // temporary fix for payment page
  getPaymentData(passed_url){
    return this.http
              .get(passed_url)
              .toPromise()
              .then(res => {
                res['json'] = JSON.parse(res['_body'])
                console.log(typeof res['json'])
                return res
              })
              .catch(Error => {
                  Error['json'] = JSON.parse(Error['_body'])
                  return Error
              });
  }

  getOb(url){
      return this.http.get(url)
        // .map((res:Response) => {res.json()})
  }

  getPdf(url){
   let headers = new Headers({'Content-type' : 'application/pdf'});
    let options = new  RequestOptions({ headers: headers });
   return this.http.get(url, options);
   
  }
  
}
