import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerModule } from './servicios/interceptor/spinner/spinner.module';
import { SpinnerInterceptor } from './servicios/interceptor/spinner-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SpinnerModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
