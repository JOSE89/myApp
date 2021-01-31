import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import {useSelector} from 'react-redux';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import {getResults} from '../store/selectors/SoccerResults';
import NewSoccerDialog from '../components/NewSoccerDialog';
import DeleteSoocerDialog from '../components/DeleteSoocerDialog';
import EditSoccerDialog from '../components/EditSoccerDialog';

const PanelGoalsPage = () => {
  const results = useSelector(getResults);

  useEffect(() => {
      setProducts(results);
      setProductEditDialog(false);
  }, [results]);
  
      const [product, setProduct] = useState('');
      const [products, setProducts] = useState([]);
      const [productDialog, setProductDialog] = useState(false);
      const [deleteSoccertDialog, setDeleteSoccerDialog] = useState(false);
      const [selectedProducts, setSelectedProducts] = useState(null);
      const [productEditDialog, setProductEditDialog] = useState(false);
      const [submitted, setSubmitted] = useState(false);
      const dt = useRef(null);
  
      const openNew = useCallback(() => {
          setSubmitted(false);
          setProductDialog(true);
      }, []);
  
      const editProduct = useCallback(product => {
          setProductEditDialog({...product})
      }, []);
  
      const confirmDeleteProduct = useCallback(product => {
          setProduct(product);
          setDeleteSoccerDialog(true);
      }, []);
  
      const onInputChange = useCallback((e, name, editing) => {
          const val = (e.target && e.target.value) || '';
          let _product = editing ? {...productEditDialog} : {...product};
          _product[`${name}`] = val;
        
          if(editing){
            setProductEditDialog(_product)
          }else{
            setProduct(_product);
          }        
      }, [product, productEditDialog]);
  
      const leftToolbarTemplate = useMemo(() => {
          return (
              <React.Fragment>
                  <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
              </React.Fragment>
          )
      }, [openNew]);
  
      const actionBodyTemplate = useCallback(rowData => {
          return (
              <React.Fragment>
                  <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                  <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
              </React.Fragment>
          );
      }, [confirmDeleteProduct, editProduct]);
  
      const header = useMemo (() => (
          <div className="table-header">
              <h1 className="p-m-0">SOCCER MATCH</h1>
          </div>
      ), []);

      return (
          <div className="datatable-crud-demo">
              <div className="card">
                  <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
  
                  <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                      dataKey="id"
                      paginator = {products?.length > 5 ? true : false}
                      rows={5}
                      rowsPerPageOptions={[5, 10, 25]}
                      header={header}>

                      <Column field="home" header="Home" sortable></Column>
                      <Column field="visit" header="Visit" sortable></Column>
                      <Column field="homeGoals" header="Home G." sortable></Column>
                      <Column field="visitGoals" header="Visit G." sortable></Column>
                      <Column body={actionBodyTemplate}></Column>
                  </DataTable>
              </div>
        
            {productDialog && <NewSoccerDialog 
                soccer = {product} setProduct={setProduct}
                submitted={submitted} setSubmitted={setSubmitted}
                productDialog = {productDialog} setProductDialog={setProductDialog}
                onInputChange={onInputChange}/>}
                
            {productEditDialog && <EditSoccerDialog 
                soccerEditDialog = {productEditDialog}
                setProductEditDialog = {setProductEditDialog}
                soccer = {product} setProduct={setProduct}
                submitted={submitted} setSubmitted={setSubmitted}
                productDialog = {productDialog} setProductDialog={setProductDialog}
                onInputChange={onInputChange}/>}

            {deleteSoccertDialog && <DeleteSoocerDialog
                setSubmitted={setSubmitted}
                deleteSoccertDialog= {deleteSoccertDialog}
                setDeleteSoccerDialog = {setDeleteSoccerDialog}
                soccer = {product}/>
                }
          </div>
      );
};

export default memo(PanelGoalsPage);
