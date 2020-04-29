import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import 'hammerjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatDialogModule} from '@angular/material/dialog';
import { ApiTalkService } from '../../services/api-talk.service';
import { ClipboardModule } from 'ngx-clipboard';
import { HttpModule } from '@angular/http';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { OrdersComponent} from '../../pages/orders/orders.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthguardGuard } from '../../guard/authguard.guard';
import { AuthenticationService } from '../../services/authentication.service';
import { DateTimePipe } from './../../date-time.pipe';
import { PaginationComponent } from './../../reusable/pagination/pagination.component';
import { AddressComponent } from '../../pages/address/address.component';
import { MyDatePickerModule } from 'mydatepicker';
//import {MatIconModule} from '@angular/material/icon';
// import { ToastrModule } from 'ngx-toastr';
import { PaymentsComponent } from '../../pages/payments/payments.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';

import { TransactionDetailsComponent } from '../../pages/payments/transaction-details/transaction-details.component';
import { SecurityComponent } from '../../pages/payments/security/security.component';
import { RecoDetailsComponent } from '../../pages/payments/reco-details/reco-details.component';
import { AddPaymentComponent } from '../../pages/payments/add-payment/add-payment.component';
import { AssetComponent } from '../../pages/asset/asset.component';
import {MatRadioModule} from '@angular/material/radio';
import { TransactionFiltersComponent } from '../../pages/payments/transaction-filters/transaction-filters.component';
import { InvoiceComponent } from '../../pages/invoice/invoice.component';
import { EditComponent } from '../../pages/user-profile/edit/edit.component';
import { DetailComponent } from '../../pages/asset/detail/detail.component';
import{ DialogueComponent } from '../../reusable/dialogue/dialogue.component';
import{ EditAddressComponent } from '../../pages/address/edit-address/edit-address.component';
import {OrderDetailComponent} from '../../pages/orders/order-detail/order-detail.component';
import { CartComponent } from '../../pages/orders/cart/cart.component';
import { CreateComponent } from '../../pages/orders/create/create.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TimePickerComponent } from '../../reusable/time-picker/time-picker.component';
import { FillAddressComponent } from '../../pages/orders/create/fill-address/fill-address.component';
import { AddressDialogueComponent } from '../../reusable/dialogue/address-dialogue/address-dialogue.component';
import { BillingAddressDialogueComponent } from '../../reusable/dialogue/billing-address-dialogue/billing-address-dialogue.component';
import { EmployeesComponent } from '../../pages/user-profile/employees/employees.component';
import { EditContactPersonComponent } from '../../pages/user-profile/employees/edit-contact-person/edit-contact-person.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatTabsModule,
    MatIconModule,
    MatRadioModule,
    MatExpansionModule,
    MyDatePickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    PdfViewerModule
  
  //  MatIconModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    OrdersComponent,
    MapsComponent,
    DateTimePipe,
    PaginationComponent,
    AddressComponent,
    PaymentsComponent,
    TransactionDetailsComponent,
    SecurityComponent,
    RecoDetailsComponent,
    AddPaymentComponent,
    TransactionFiltersComponent,
    EditContactPersonComponent,
    BillingAddressDialogueComponent,
    InvoiceComponent,
    EditComponent,
    AddressDialogueComponent,
    AssetComponent,
    DetailComponent,
    DialogueComponent,
    EditAddressComponent,
    OrderDetailComponent,
    CartComponent,
    CreateComponent,
    TimePickerComponent,
    FillAddressComponent,
    EmployeesComponent
  ],
  providers: [ApiTalkService,AuthenticationService, AuthguardGuard],
  entryComponents: [
    DialogueComponent,
    AddressDialogueComponent,
    BillingAddressDialogueComponent
    ],
})

export class AdminLayoutModule {}
