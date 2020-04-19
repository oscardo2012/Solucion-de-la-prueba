<?php

namespace App\Exports;

use App\Producto;

//Si se quiere exportar desde una colección se debe implementar FromCollection y definir la función "collection()"
//use Maatwebsite\Excel\Concerns\FromCollection;

//Si se quiere exportar desde un query se debe implementar FromQuery y definir la función "query()"
use Maatwebsite\Excel\Concerns\FromQuery;

//Para que incluya los encabezados se debe implementar WithHeadings y definir la función "headings(): array"
use Maatwebsite\Excel\Concerns\WithHeadings;

//Para que el tamaño de las columnas se ajuste automáticamente se debe implementar ShouldAutoSize
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

//Para que el libro tenga título se debe implementar WithTitle y definir la función "title(): string"
use Maatwebsite\Excel\Concerns\WithTitle;

class ProductosExport implements FromQuery, WithHeadings, ShouldAutoSize, WithTitle
{
	/*
	 * Esta clase se encarga de realizar la exportación de los datos,
	 * para este proyecto se usaran para generar archivos de excel.
	 */
	/**
	* @return \Illuminate\Support\Collection
	*/

	public function collection(){
		//El origen de los datos del archivo va a ser por una consulta a la BD, pero en collection.
		return Producto::all();
	}

	public function query(){
		//El origen de los datos del archivo va a ser por una consulta a la BD, pero en query.
		return Producto::query()->select('producto_referencia', 'producto_nombre', 'producto_descripcion', 'producto_cantidad', 'producto_estado');
	}

	public function headings() : array{
		//Retorna un array que contiene los títulos de las columnas.
		return ['Referencia del producto', 'Nombre del producto', 'Descripción del producto', 'Cantidad del producto', 'Estado del producto'];
	}

	public function title(): string{
		//Titulo del libro
		return 'Productos';
	}
}
