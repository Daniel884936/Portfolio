import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('navMenu') navMenu: ElementRef;
  @Input() public currentActive:number = 0;
  public sectionActivated: number;

  constructor(private readonly _render: Renderer2) { }

  ngOnInit(): void {

  }

  toggleNav():void{
    console.log(this.navMenu);
    this._render.addClass(this.navMenu.nativeElement, 'show');
  }

  closeNav():void{
    this._render.removeClass(this.navMenu.nativeElement, 'show');
  }



}
