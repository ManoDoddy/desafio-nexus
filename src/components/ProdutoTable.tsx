import { NetworkStatus, useQuery } from "@apollo/client";
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { GET_PRODUTOS } from "../queries/Produto";
import { useEffect, useState } from "react";


const ProdutoTable = () => {

    type Produto = {
        id: string,
        nome: string,
        preco: number,
        categoria: Categoria
    }

    type Categoria = {
        descricao: string
    }

    type Filter = {
        categoria: string[]
    }

    const [filter, setFilter] = useState<Filter>({
        categoria: []
    })
    const [dataRows, setDataRows] = useState<GridRowsProp >([])

    const { data, loading, refetch, networkStatus } = useQuery<{ produtos: Produto[] }>(GET_PRODUTOS,{
        variables: { categoria: filter.categoria }
    })

    

    useEffect(() => {
        if(data)
            handleDataRowValues(data?.produtos)
    }, [data, loading])

    useEffect(() => {
        if(networkStatus != NetworkStatus.loading)
            refetch({ categoria: filter.categoria })
    }, [filter])

    const handleDataRowValues = (data: Produto[]) => {
        setDataRows([
            ...data.map(produto => {
                const newProduto = {
                    ...produto,
                    categoria: produto.categoria.descricao
                }
                return newProduto
            })
        ])
    }

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newFilter = filter
        if(event.target.checked)
            newFilter.categoria.push(event.target.value)
        else
            newFilter.categoria = newFilter.categoria.filter(categoria => categoria !== event.target.value )
        
        setFilter({...newFilter})
    }

    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'preco', headerName: 'Preço (R$)', width: 150 },
        { field: 'categoria', headerName: 'Categoria', width: 150 },
    ];

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <FormGroup>
                    <Typography variant="body1"><b>Categoria</b></Typography>
                    <FormControlLabel control={<Checkbox size="small" value="Cartas" onChange={ e => handleCheckBoxChange(e)} />} label="Cartas"/>
                    <FormControlLabel control={<Checkbox size="small" value="Tabuleiro" onChange={ e => handleCheckBoxChange(e)} />} label="Tabuleiro"/>
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                {!loading &&
                    <DataGrid rows={dataRows} columns={columns} />
                }
            </Grid>
        </Grid>
    )
}

export default ProdutoTable