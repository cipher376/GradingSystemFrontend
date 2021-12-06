import { SignalService } from 'src/app/shared/services/signal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-non-blocking',
  templateUrl: './loader-non-blocking.component.html',
  styleUrls: ['./loader-non-blocking.component.scss']
})
export class LoaderNonBlockingComponent implements OnInit {
  show = false;
  constructor(
    private signal: SignalService
  ) { }

  ngOnInit(): void {
    this.signal.loaderNonBlockingSource$.subscribe(action => {
      this.show = action;
    })
  }

}
