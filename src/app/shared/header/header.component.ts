import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalRow!: number;
  public pageIndex = 1;
  public pageSize = 20;
  public pageDisplay = 10;
  public keyword = "";
  public sort = "";

  constructor(private readonly productService: ProductService,
    private router:Router
    ) { }

  ngOnInit(): void {

  }

  search(){
    if(this.keyword!==''){
      this.productService.Search(this.pageIndex, this.pageSize, this.keyword, this.sort);
      this.router.navigateByUrl('/search');
    }
  }

}
