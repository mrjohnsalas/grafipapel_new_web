import { ProductPacking } from "@models/product-packing";
import { ProductColor } from '@models/product-color';

export interface Product {
    id: string;
    name: string;
    description: string;
    extendDescription: string;
    superGrupoId: string;
    superGrupo: string;
    claseId: string;
    clase: string;
    grupoId: string;
    grupo: string;
    
    medida: string;
    gramaje: string;
    material: string;
    impresion: string;
    observacion: string;

    defaultImagePath: string;
    imagesPaths: string[];

    productPackaging: ProductPacking[];
    productColors: ProductColor[];

    isNew: boolean;
    statusId: number;
}