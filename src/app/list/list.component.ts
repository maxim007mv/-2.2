import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  purchaseList;

  itemForm = new FormGroup({
      itemName: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ])
  })

  ngOnInit(): void {
  }

  saveItems(): void {
    let currentUser = localStorage.getItem("currentUser")

    if( currentUser != null ) {
      localStorage.setItem("purchaseList:" + currentUser, JSON.stringify(this.purchaseList))
    }
  }

  constructor() {
    this.purchaseList = []

    let currentUser = localStorage.getItem("currentUser")

    if( currentUser != null ) {
      let json = localStorage.getItem("purchaseList:" + currentUser)
      if( json != null ) this.purchaseList = JSON.parse( json )
    }
  }

  addItem(): void {
    if( this.itemName?.value != null ) {
      this.purchaseList.push( { name: this.itemName.value, date: new Date() } )
      this.saveItems()
    }
  }

  deleteItem(index: number): void {
    this.purchaseList.splice(index, 1);
    this.saveItems()
  }

  get itemName() {
	  return this.itemForm.get('itemName')
  }
}
