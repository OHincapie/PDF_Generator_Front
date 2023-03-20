import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfRequest } from 'src/app/models/pdf.model';
import { PdfService } from 'src/app/services/pdf.service';


@Component({
  selector: 'mamada',
  templateUrl: './pdf.component.html'
})
export class PdfComponent implements OnInit {

  public formGroup!: FormGroup;
  public blob: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pdfService: PdfService
  ) {
    this.createFormGroup();
  }

  ngOnInit(): void {

  }

  private createFormGroup() {
    this.formGroup = this.formBuilder.group({
      nombreEmpleado: [null, Validators.required],
      cedulaEmpleado: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      salarioEmpleado: [null, Validators.required],
      fechaInicioEmpleado: [null, Validators.required],
      fechaFinEmpleado: [null, Validators.required]
    })
  }

  onSubmitForm() {
    if (this.formGroup.valid) {
      const pdfReq: PdfRequest = {
        cedulaEmpleado: this.formGroup.value.cedulaEmpleado,
        nombreEmpleado: this.formGroup.value.nombreEmpleado,
        salarioEmpleado: this.formGroup.value.salarioEmpleado,
        fechaInicioEmpleado: this.formGroup.value.fechaInicioEmpleado,
        fechaFinEmpleado: this.formGroup.value.fechaFinEmpleado,
      }
      try {
        this.pdfService.generatePdf(pdfReq).subscribe((data: any) => {
          console.log(data);

          this.blob = new Blob([data], {type: 'application/pdf'});
          const downloadUrl = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `Certificado - ${pdfReq.nombreEmpleado}.pdf`;
          link.click()
        });

      } catch (error) {
        console.log(error);

      }
    }
  }

}
