import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './controller/home/home.component';
import { TrainingComponent } from './controller/training/training.component';
import { ServicesComponent } from './controller/services/services.component';
import { CareerComponent } from './controller/career/career.component';
import { BlogComponent } from './controller/blog/blog.component';
import { ServicesectionComponent } from './components/servicesection/servicesection.component';
import { ContactsectionComponent } from './components/contactsection/contactsection.component';
import { FootersectionComponent } from './components/footersection/footersection.component';
import { TrainingDetailComponent } from './controller/training-detail/training-detail.component';
import { ContactComponent } from './controller/contact/contact.component';
import { LoginComponent } from './controller/login/login.component';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { TrainingAdminComponent } from './controller/training-admin/training-admin.component';
import { ServiceAdminComponent } from './controller/service-admin/service-admin.component';
import { BlogAdminComponent } from './controller/blog-admin/blog-admin.component';
import { TrainingtableViewComponent } from './components/training-tableview/training-tableview.component';
import { TrainingcardViewComponent } from './components/training-cardview/training-cardview.component';
import { EditTrainingComponent } from './controller/edit-training/edit-training.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AddTrainingComponent } from './controller/add-training/add-training.component';
import { AddServicesComponent } from './controller/add-services/add-services.component';
import { EditServicesComponent } from './controller/edit-services/edit-services.component';
import { ServicesCardviewComponent } from './components/services-cardview/services-cardview.component';
import { ServicesTableviewComponent } from './components/services-tableview/services-tableview.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BlogCardviewComponent } from './components/blog-cardview/blog-cardview.component';
import { BlogTableviewComponent } from './components/blog-tableview/blog-tableview.component';
import { AddBlogComponent } from './controller/add-blog/add-blog.component';
import { EditBlogComponent } from './controller/edit-blog/edit-blog.component';
import { BlogDetailsComponent } from './controller/blog-details/blog-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './controller/registration/registration.component';
import { ContactAdminComponent } from './controller/contact-admin/contact-admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DialogComponent } from './components/dialog/dialog.component';
import {
  MatDialogModule,
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { BookingComponent } from './components/booking/booking.component';
import {MatDividerModule} from '@angular/material/divider';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrainingComponent,
    ServicesComponent,
    CareerComponent,
    BlogComponent,
    ServicesectionComponent,
    ContactsectionComponent,
    FootersectionComponent,
    TrainingDetailComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    TrainingAdminComponent,
    ServiceAdminComponent,
    BlogAdminComponent,
    TrainingtableViewComponent,
    TrainingcardViewComponent,
    EditTrainingComponent,
    AddTrainingComponent,
    AddServicesComponent,
    EditServicesComponent,
    ServicesCardviewComponent,
    ServicesTableviewComponent,
    BlogCardviewComponent,
    BlogTableviewComponent,
    AddBlogComponent,
    EditBlogComponent,
    BlogDetailsComponent,
    RegistrationComponent,
    ContactAdminComponent,
    DialogComponent,
    BookingComponent
  ],
  imports: [
    MatDividerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    EditorModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogTitle, 
    MatDialogContent,
    MatDialogModule,
    MatFormFieldModule,
     MatInputModule, 
     MatSlideToggleModule,
     MatDatepickerModule, 
     MatNativeDateModule,
     MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    MatCardModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    NgxSkeletonLoaderModule.forRoot()
  ],
  providers: [
    authGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
