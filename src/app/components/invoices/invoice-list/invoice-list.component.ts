import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { Invoice } from '../../../models/invoice';
import { element } from 'protractor';
import { AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  invoiceList: Invoice[];
  itemsRef: AngularFireList<any>;
 
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService.getInvoices().snapshotChanges()
      .map(data => data.map(datum => datum.payload.toJSON()))
      .map(data => {
          return data.map(datum => {
            let purchases = [];
            for(let key in datum.purchases) {
                purchases.push(datum.purchases[key]);
            }
            datum.purchases = purchases;
            return datum;
          });
      })
      .subscribe(data => this.invoiceList = data);    
       
  }

 /*  onEdit(invoice: Invoice){
    this.invoiceService.selectedInvoice = Object.assign({},invoice);
  }*/

  onDelete($key: string){
    this.invoiceService.deleteInvoice($key);
  } 

  

} 

