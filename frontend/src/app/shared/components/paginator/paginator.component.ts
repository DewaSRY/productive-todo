import { Component, Input } from '@angular/core';
import { Link, Meta } from "@app/shared/models/shared"

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  metaData!: Meta
  
  @Input() set setLinks(meta: Meta){
    this.metaData = meta
  }


  getPageNumber(url: string | null) {
    if(url === null) return ""
    return url.split('=')[1]
  }

  get prevLinks() {
    return this.metaData.links[0]
  }

  get nextLink() {
    return this.metaData.links[this.metaData.links.length -1]
  }

  get links() {
    return this.metaData.links.slice(1, this.metaData.links.length -1)
  }



}
