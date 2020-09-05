import {Injectable} from '@angular/core';
import {IInvoice, Invoice} from '../models/invoice';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AuthService } from './auth.service';


@Injectable()
export class InvoiceService {

  invoiceList: AngularFireList<any>;


  constructor(private firebase: AngularFireDatabase,private authService: AuthService,) {
    this.invoiceList = firebase.list('invoices');

  }

  getInvoices() {
    return this.invoiceList = this.firebase.list('invoices');
  }

  insertInvoice(invoice: IInvoice) {
    invoice.createdAt = new Date().toString();
    invoice.uid = this.authService._authFB.auth.currentUser.uid;
    this.invoiceList.push(invoice);
  }

  updateInvoice(invoice: Invoice) {
    this.invoiceList.update(invoice.$key, {
      /*   invnumber: invoice.invnumber,
        custumername: invoice.custumername,
        products: invoice.products,
        productprice: invoice.productprice,
        quantity: invoice.quantity,
        amount: invoice.amount,
        status: invoice.status,
        invtotal: invoice.invtotal,
        paymenttype: invoice.paymenttype   */
    });
  }

  deleteInvoice($key: string){
    this.invoiceList.remove($key);
  } 

}
