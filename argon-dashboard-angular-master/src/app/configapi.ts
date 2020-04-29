export class Config{
    static TANKUP_NUMBER = 7800008800;
   // static API_URL = 'http://localhost:3000/api';
     static API_URL = 'http://localhost:3000/api';
    // static API_URL = 'http://localhost:3000/api';
    // static API_URL = 'http://192.168.1.26:3000/api';
    static INSPECTION_REPORT_API_URL = 'http://localhost:3000/api-v2';
    // static INSPECTION_REPORT_API_URL = 'http://localhost:3000/api-v2';
    // static INSPECTION_REPORT_API_URL = 'http://13.233.68.241:3000/api-v2';

    // static APIV3_URL = 'http://localhost:3000/api-v3';
    
    // static API_URL_V3 = 'http://13.233.68.241:3000/api-v3';

    static API_URL_V3 = 'http://localhost:3000/api-v3';
    // static API_URL_V3 = 'http://localhost:3000/api-v3';
    static APIV3_URL =Config.API_URL_V3;

    static ORDERS_URL  = '/order';
    static CUSTOMER_URL  = '/customer';
    static EMPLOYEE_URL  = '/employee';
    static CITY_URL  = '/city';
    static STATE_URL = '/state';
    static Legal_entity_url = '/legal-entity';
    static Legal_entity_location_url = '/legal-entity-location';
    static Legal_entity_user = '/legal-entity-user';
    // static Oil_Company_URL  = '/oil_company';
    static Search_URL ='/search';
    static Vehicle_URL  = '/vehicle';
    static Vendor_URL  = '/vendor';
    static Product_URL  = '/product';
    static Payment_URL = '/payment';
    static Driver_URL  = '/driver';
    static Inspection_URL  = '/inspection';
    static Analytics_URL  = '/analytics';

    

    static TANK_HISTORY = function(id){
        return this.ORDERS_URL+'/'+id+'/tank_history'
    };
    static page = 1 //for orders
    static limit = 40 //for ordergs

    static cusPage = 1
    static cusLimit = 20

    static legalentityPage = 1
    static legalentityLimit = 20

    static vehiclePage = 1
    static vehicleLimit = 20

    static cusOrderPage = 1
    static cusOrderLimit = 20

    static paymentPage = 1
    static paymentLimit = 20 

    static cusPaymentDetailsPage = 1
    static cusPaymentDetailsLimit = 20
    static paymentDetailsPage = 1
    static paymentDetailsLimit = 20

    static cusTransactionPage = 1
    static cusTransactionLimit = 20
    
    static vehicleTankPage = 1
    static vehicleTankLimit = 20

    static vehicleDetailPage = 1
    static vehicleDetailLimit = 20

    static vehicleDiprodPage = 1
    static vehicleDiprodLimit = 20

    static vehicleTankFillingPage = 1
    static vehicleTankFillingLimit = 20

    static routeMappingPage = 1
    static routeMappingLimit = 20

    static vendorFillingHistoryPage =1
    static vendorFillingHistoryLimit =1

    static vehicleTankInVendorPage = 1
    static vehicleTankInVendorLimit = 20

    static vendorTransactionPage = 1
    static vendorTransactionLimit = 20

    static driverPaymentPage = 1
    static driverPaymentLimit = 20

    static employeePaymentPage = 1
    static employeePaymentLimit = 20

    static invoicePage = 1
    static invoiceLimit = 20

    static driverpaymentPage = 1
    static driverpaymentLimit = 10

    static driverDetailPage = 1
    static driverDetailLimit = 20

    static transactionInvoicePage = 1
    static transactionInvoiceLimit = 20
    
    static CUSTOMER_URL_BY_PAGE = () => {
        return Config.API_URL+Config.CUSTOMER_URL+'?page='+Config.cusPage+'&limit='+Config.cusLimit
    }
    static LEGAL_ENTITY_URL_BY_PAGE = () =>{
        return Config.API_URL+Config.Legal_entity_url+'?page='+Config.legalentityPage+'&limit='+Config.legalentityLimit
    }
    static ORDER_URL_BY_PAGE = () => {
        return Config.API_URL+Config.ORDERS_URL+'?page='+Config.page+'&limit='+Config.limit
    }
    static PAYMENT_BY_PAGE = () => {
        return Config.API_URL+'/payment?page='+Config.paymentPage+'&limit='+Config.paymentLimit
    }

    static PAYMENT_BY_CUSTOMER = (customerId) =>{
        return Config.API_URL+'/payment/customer-payment/'+customerId+'?page='+Config.paymentDetailsPage+'&limit='+Config.paymentDetailsLimit
    }
    static INVOICE_BY_CUSTOMER = (customerId) =>{
        return Config.API_URL+'/payment/invoices/'+customerId+'?page='+Config.invoicePage+'&limit='+Config.invoiceLimit
    }
    
    static CUSTOMER_TRANSACTION_BY_PAGE =() => {
        return Config.API_URL + Config.Payment_URL+'/get-payment?page='+Config.cusTransactionPage+'&limit='+Config.cusTransactionLimit
    }
    static CUSTOMER_INVOICE_BY_PAGE =() => {
        return Config.API_URL + Config.Payment_URL+'/get-invoices?page='+Config.transactionInvoicePage+'&limit='+Config.transactionInvoiceLimit
    }
    static DRIVER_DETAIL = (driverId) =>{
        return Config.API_URL + Config.Driver_URL + "/" + driverId+'?page='+Config.driverDetailPage+'&limit='+Config.driverDetailLimit
    }

    static DRIVER_PAYMENT =() =>{
        return Config.API_URL + Config.Payment_URL+'&page='+Config.driverpaymentPage+'&limit='+Config.driverpaymentLimit
    }

    static VEHICLE_URL_BY_PAGE = () => {
        return Config.API_URL+Config.Vehicle_URL+'?page='+Config.vehiclePage+'&limit='+Config.vehicleLimit
    }

    static VEHICLE_DETAILS_URL_BY_PAGE =(vehicleId) =>{
        return Config.API_URL+Config.Vehicle_URL+"/"+vehicleId+'?page='+Config.vehicleDetailPage+'&limit='+Config.vehicleDetailLimit
    }

    static VEHICLE_DIPROD_BY_PAGE = (vehicleId) =>{
        return Config.API_URL+Config.Vehicle_URL+"/"+vehicleId+"/diprod?page="+Config.vehicleDiprodPage+'&limit='+Config.vehicleDiprodLimit
    }
    static VEHICLE_TANKFILLING_BY_PAGE = (vehicleId) =>{
        return Config.API_URL+Config.Vehicle_URL+"/"+vehicleId+"/vehicle-tank-filling?page="+Config.vehicleTankFillingPage+'&limit='+Config.vehicleTankFillingLimit
    }
    static ROUTE_MAPPING_BY_PAGE = () =>{
    return Config.API_URL+Config.ROUTE_MAPPING + '?page='+Config.routeMappingPage+'&limit='+Config.routeMappingLimit
    }

    static VEHICLE_TANKFILLING_IN_VENDOR_BY_PAGE =(vehicleId) =>{
        return Config.API_URL+Config.Vehicle_URL+"/"+vehicleId+"/vehicle-tank-filling?page="+Config.vehicleTankInVendorPage+'&limit='+Config.vehicleTankInVendorLimit
    }

    static VENDOR_URL_BY_PAGE = () => {
        return Config.API_URL+Config.Vendor_URL+'?page='+Config.vehicleTankPage+'&limit='+Config.vehicleTankLimit
    }

    static VENDOR_TRANSACTION_BY_PAGE = (vendorId) =>{
        return Config.API_URL + Config.Vendor_URL+ "/"+ vendorId+"/vendor-transaction?page="+Config.vendorTransactionPage+"&limit="+Config.vendorTransactionLimit
    }
    static CUSTOMER_ORDERS = (customerId) => {
        return Config.API_URL+Config.ORDERS_URL+'?page='+Config.cusOrderPage+'&limit='+Config.cusOrderLimit+
        "&customer_id="+customerId
    }
    static EDIT_ADDRESS_URL = (customerId, addressId) => {
        return Config.API_URL+Config.CUSTOMER_URL+"/"+customerId+"/address/"+addressId
    }
    static ADD_ADDRESS_URL = (customerId) => {
        return Config.API_URL+Config.CUSTOMER_URL+"/"+customerId+"/address/"
    }
    static VENDOR_PRODUCT_URL = (vendorId, productId) => {
        return Config.API_URL+Config.Vendor_URL+"/"+vendorId+"/product/"+productId
    }
    static PRODUCT_CITY_URL = (cityId, productId) => {
        return Config.API_URL+Config.Product_URL+"/"+productId+"/city/"+cityId
    }

    static PAYMENT_URL = id => {
        return Config.API_URL+"/customer/"+id+"/payment"
    }

    static DRIVER_PAYMENT_URL = (driverId) =>{
        return Config.API_URL+Config.Driver_URL+"/"+driverId+"/driver-payment-details?page="+Config.driverPaymentPage+'&limit='+Config.driverPaymentLimit
    }
    static EMPLOYEE_PAYMENT_URL = (driverId) =>{
        return Config.API_URL+Config.Driver_URL+"/"+driverId+"/employee-payment-details?page="+Config.employeePaymentPage+'&limit='+Config.employeePaymentLimit
    }
    static ROUTE_MAPPING = '/route-mapping'
    static UNROUTED_SUPPLIES = '/unrouted-supplies'
    // static VEHICLE_SUPPLY_BY_DATE = SS
    // product/1/city/1
    // 

    static queryparams = function(obj : any){
        //return ?key1=value1&key2=value2
        //[{'ke1' : 'value1'},{'ke2' : 'value2'},{'ke3' : 'value3'},{'ke4' : 'value4'}]
        let query_string = '?'
        // for(let i = 0; i < array.length; i ++){
            for(var key in obj){
                //console.log(key); // alerts key
                //console.log(array[i][key]); //alerts key's value
                let val = obj[key]
                query_string += key+"="+val+"&"
              }
        // }
        return query_string
    }

    //totalQuantity is a way to calculate the delivery charge of this order because of the minimum charge problem
    static totalQuantity = 0;

}