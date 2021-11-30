import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit() {
  }

  onBack() 
  {
    this.router.navigate(['/']);
  }

  onSubmit(Form : NgForm){
    console.log('Congrats,from Submitted');
    console.log(Form);
  }
}
