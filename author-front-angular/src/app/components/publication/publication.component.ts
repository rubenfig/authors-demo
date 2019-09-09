import {Component, Input, OnInit} from '@angular/core';
import {Publication} from "../../models/publication";
import {Author} from "../../models/author";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.sass']
})
export class PublicationComponent implements OnInit {
  @Input() publication: Publication;
  @Input() author: Author;

  constructor() { }

  ngOnInit() {
  }

}
