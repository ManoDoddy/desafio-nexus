import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { GET_PRODUTOS } from "../queries/Produto";
import { useEffect, useState } from "react";


const ProdutoTable = () => {

    type Produto = {
        id: string,
        nome: string,
        preco: number,
        categoria: string
    }

    const { data, loading } = useQuery<{ produtos: Produto[] }>(GET_PRODUTOS)
    const [dataRows, setDataRows] = useState<GridRowsProp >([])

    useEffect(() => {
        if(data){
            setDataRows(data?.produtos)
        }
    }, [data])

    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'preco', headerName: 'Preço', width: 150 },
        { field: 'categoria', headerName: 'Categoria', width: 150 },
    ];

    return (
        <Grid container direction="row" spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                {!loading &&
                    <DataGrid rows={dataRows} columns={columns} />
                }
            </Grid>
        </Grid>
    )
}

export default ProdutoTable