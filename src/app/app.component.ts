import { Component,OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Stock } from './stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Stock Watch';
  exchanges : Stock[];

  constructor(private socket: Socket) { }

  ngOnInit(): void {    
    this.socket.fromEvent<Stock[]>('stocks').subscribe(data=>{
      console.log(data);
      this.exchanges = data;
    },
    err => console.log(err));
    
  }

  getCountryImage(img: string): string {
    return '/images/' + img + '.gif';
  }
  getStatusImage(img: string): string {
    return '/images/' + img + '.png';
  }

}
