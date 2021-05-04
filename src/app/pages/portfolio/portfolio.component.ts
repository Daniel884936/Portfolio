import { Component, HostListener, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

//This class can be beeter
export class PortfolioComponent implements OnInit, AfterViewInit {

  @ViewChild('home') homeElement: ElementRef;
  @ViewChild('skills') skillsElement: ElementRef;
  @ViewChild('education') educationElement: ElementRef;
  @ViewChild('about') aboutElement: ElementRef;
  @ViewChild('works') worksElement: ElementRef;
  @ViewChild('contact') contactElement: ElementRef;
  @Output() currentActive: EventEmitter<number> = new EventEmitter();

  private homeOffset: Number = null;
  private skillsOffset: Number = null;
  private educationOffset: Number = null;
  private aboutOffset: Number = null;
  private worksOffset: Number = null;
  private contactOffset: Number = null;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.homeOffset = this.homeElement.nativeElement.offsetTop;
    this.skillsOffset = this.skillsElement.nativeElement.offsetTop;
    this.educationOffset = this.educationElement.nativeElement.offsetTop;
    this.aboutOffset = this.aboutElement.nativeElement.offsetTop;
    this.worksOffset = this.worksElement.nativeElement.offsetTop;
    this.contactOffset  = this.contactElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    if (window.pageYOffset>= this.homeOffset && window.pageYOffset < this.aboutOffset) {
      this.currentActive.emit(1);
    } else if (window.pageYOffset >= this.aboutOffset && window.pageYOffset < this.skillsOffset) {
      this.currentActive.emit(2);
    } else if (window.pageYOffset >= this.skillsOffset && window.pageYOffset < this.educationOffset) {
      this.currentActive.emit(3);
    }
    else if (window.pageYOffset >= this.educationOffset && window.pageYOffset < this.worksOffset) {
      this.currentActive.emit(4);
    }
    else if (window.pageYOffset >= this.worksOffset && window.pageYOffset < this.contactOffset) {
      this.currentActive.emit(5);
    }
    else if (window.pageYOffset >= this.contactOffset) {
      this.currentActive.emit(6);
    } else {
      this.currentActive.emit(0);
    }
  }
}
