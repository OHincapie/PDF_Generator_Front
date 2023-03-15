import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { PdfRequest } from '../models/pdf.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private readonly url = `${enviroment.url}/pdf`;

  constructor(private readonly http:HttpClient) { }

  generatePdf(pdfRequest:PdfRequest) {
    const options = {
      responseType: 'blob' as 'json'
    }
    return this.http.post(this.url, pdfRequest, options);
  }
  
}
