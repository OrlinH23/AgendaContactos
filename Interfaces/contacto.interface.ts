export interface Contacto {
  id: string;
  nombreCompleto: string;       
  empresaOrganizacion: string;  
  telefono: string;             
  correo: string;              
  etiquetasGrupos: string[];    
  proximoSeguimiento: string;   
  notaGeneral: string;         
  fechaUltimoContacto: string;  
}

export type TipoInteraccion = 'llamada' | 'reunion' | 'correo' | 'nota';

export interface Interaccion {
  id: string;
  contactoId: string;           
  tipo: TipoInteraccion;        
  detalle: string;
  fecha: string;
}

