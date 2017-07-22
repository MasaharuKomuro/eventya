import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})

export class FullLayoutComponent implements OnInit {

  public  disabled: boolean = false;

  constructor(private router: Router) {}

  public toggled = function(open: boolean): void {};

  public toggleDropdown = function($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  };

  // this.router.navigate(['/login']);

  ngOnInit(): void {}
}
