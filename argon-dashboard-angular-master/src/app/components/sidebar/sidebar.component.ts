import {AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    display: boolean;
    childmenu: {
       path: string;
        title: string;
        icon: string;
        class: string;
        display: boolean; },
    }

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', display: true ,childmenu: {path:'/somepath',title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: 'dropdownadded', display: true }},
    { path: '/orders', title: 'My orders',  icon:'ni-cart text-blue', class: '', display: true, childmenu: {path:'/somepath',title: '',  icon: 'ni-tv-2 text-primary', class: '', display: false }},
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', display: true ,childmenu: {path:'/somepath',title: '',  icon: 'ni-tv-2 text-primary', class: '', display: false }},
    
    { path: '/user-profile', title: 'My profile',  icon:'ni-single-02 text-yellow', class: '', display: true,childmenu: {path:'/somepath',title: '',  icon: 'ni-tv-2 text-primary', class: '', display: false } },
    { path: '/employees', title: 'My Employees',  icon:'ni-circle-08 text-pink', class: '', display: true,childmenu: {path:'/somepath',title: '',  icon: 'ni-tv-2 text-primary', class: '', display: false } },

    { path: '/user-profile/edit', title: 'Edit',  icon:'ni-single-02 text-yellow', class: '', display: false ,childmenu: {path:'/somepath',title: '',  icon: 'ni-tv-2 text-primary', class: '', display: false }},
    { path: '/address', title: 'Address Book',  icon:'ni-bullet-list-67 text-red', class: '', display: true,childmenu: {path:'/somepath',title: '',  icon: 'ni-tv-2 text-primary', class: '', display: false } },
   { path: '/payments', title: 'Payments',  icon:'ni-credit-card text-info', class: '' , display: true,childmenu: {path:'/somepath',title: '',  icon: 'ni-tv-2 text-primary', class: '', display: false }},
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    //{ path: '/invoice', title: 'Invoices',  icon:'ni-collection text-pink', class: '', display: true },
    {path: '/asset', title: 'My Assets', icon : 'ni-briefcase-24', class: '', display:true,childmenu: {path:'/somepath',title: '',  icon: 'ni-tv-2 text-primary', class: '', display: false }},
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('childmenuitem') myList: ElementRef;
  public menuItems: any[];
  public isCollapsed = true;
  public isChildMenu
  constructor(private router: Router) { }

  ngOnInit() {
    
    this.isChildMenu = 'none'
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   this.menuItems.forEach(element=>{
    
     
   })
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  ngAfterViewInit() {
    let elem = document.getElementById('childmenuitem').innerHTML;
    console.log(elem)
}
  passClass(value, i){
   
    if(value == 'dropdownadded'){
      this.isChildMenu = 'displayOn'
      i = false
    }
   

    
  }
}
