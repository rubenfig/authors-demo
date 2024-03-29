import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthorsService} from "../../services/author.service";
import {Author} from "../../models/author";
import {PublicationsService} from "../../services/publication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  publications = [];
  authors = [];
  firstPage = false;
  lastPage = false;
  selectedAuthor: Author;
  order = 'DESC';
  mobileQuery: MediaQueryList;
  searchText: string = '';
  paginationStack = [];

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private authorsService: AuthorsService,
              private publicationsService: PublicationsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    Promise.all([this.listAuthors(),this.listPublications()]).then(() => {
      console.log('All loaded');
    });
  };

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  };

  async listAuthors() {
    this.authorsService.list().subscribe((response: any) => {
      this.authors = response.authors;
    }, err => {
      alert(err);
    });
  };

  async listPublications() {
    const lastEvaluated = this.paginationStack[this.paginationStack.length - 1];
    const params = {
      author: this.selectedAuthor ? this.selectedAuthor.id : null,
      order: this.order,
      limit: 10,
      title: this.searchText.length ? this.searchText : null,
      lastEvaluated: lastEvaluated && JSON.stringify(lastEvaluated)
    };
    this.publicationsService.list(params).subscribe((response: any) => {
      this.publications = response.publications;
      response.next && this.publications.length == 10 ?
        this.paginationStack.push(response.next) :
        this.lastPage = true;
      this.firstPage = !params.lastEvaluated;

    }, err => {
      alert(err.message);
    });
  };

  async goBack() {
    this.paginationStack.pop();
    this.lastPage = false;
    this.firstPage = this.paginationStack.length == 0;
    await this.listPublications();
  };

  async resetStack() {
    this.paginationStack = [];
    this.lastPage = false;
    await this.listPublications();
  };

  async selectAuthor(author){
    this.selectedAuthor = author;
    this.paginationStack = [];
    this.lastPage = false;
    this.searchText = '';
    this.order = 'DESC';
    await this.listPublications();
  };

}
