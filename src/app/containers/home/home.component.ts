import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MeService } from 'src/app/resources/me.service';

@Component({
  selector: 'pt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  me: any;

  constructor(
    private meService: MeService
  ) { }

  ngOnInit() {
    this.meService.me$
    .pipe(take(1))
    .subscribe(response => {
      console.log('res', response);
      this.me = response;
    });

    this.meService.get();
  }
}
