import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "assessment-ui";

  constructor(public router: Router) {
    console.log(environment.env);
  }

  ngOnInit() {
    this.router.navigate([""]);
  }
}
