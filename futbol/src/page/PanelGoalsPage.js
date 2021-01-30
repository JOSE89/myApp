import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
  import { DataTable } from 'primereact/datatable';
  import classNames from 'classnames';
  import {useSelector, useDispatch} from 'react-redux';
  import { Column } from 'primereact/column';
  import { Toast } from 'primereact/toast';
  import { Button } from 'primereact/button';
  import { Toolbar } from 'primereact/toolbar';
  import { Dialog } from 'primereact/dialog';
  import { InputText } from 'primereact/inputtext';
  import {createNewFootballGameAction, deletePanelAction, updateFootballGameAction} from '../store/actions/refreshPanelActions';
  import {getResults} from '../store/selectors/SoccerResults';


const PanelGoalsPage = () => {
  const dispath = useDispatch();

  const results = useSelector(getResults);

  useEffect(() => {
      setProducts(results);
      setProductEditDialog(false);

  }, [results]);
  
      const [product, setProduct] = useState('');
      const [products, setProducts] = useState([]);
      const [productDialog, setProductDialog] = useState(false);
      const [deleteProductDialog, setDeleteProductDialog] = useState(false);
      const [selectedProducts, setSelectedProducts] = useState(null);
      const [productEditDialog, setProductEditDialog] = useState(false);
      const [submitted, setSubmitted] = useState(false);
      const toast = useRef(null);
      const dt = useRef(null);
  
      const openNew = useCallback(() => {
          setSubmitted(false);
          setProductDialog(true);
      }, []);
  
      const hideDialog = useCallback(() => {
          setSubmitted(false);
          setProductDialog(false);
          setProductEditDialog(false);
      }, []);
  
      const hideDeleteProductDialog = useCallback(() => {
          setDeleteProductDialog(false);
      }, []);
  
      const saveProduct = useCallback(() => {
          setSubmitted(true);
          if (product?.home.trim()) {
              dispath(createNewFootballGameAction(product?.home, product.visit));
              setProduct(null);
              setProductDialog(false);
          }
      }, [dispath, product]);

      const updateProduct = useCallback(() => {
        setSubmitted(true);
        if (productEditDialog?.home.trim()) {
            dispath(updateFootballGameAction(productEditDialog));
            setProduct(null);
            setProductEditDialog(false);
        }
    }, [dispath, productEditDialog]);
  
      const editProduct = useCallback(product => {
          setProductEditDialog({...product})
      }, []);
  
      const confirmDeleteProduct = useCallback(product => {
          setProduct(product);
          setDeleteProductDialog(true);
      }, []);
  
      const deleteProduct = () => {
          dispath(deletePanelAction(product));
          setDeleteProductDialog(false);
          setProduct(null);
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
  
      const onInputChange = (e, name, editing) => {
          const val = (e.target && e.target.value) || '';
          let _product = editing ? {...productEditDialog} : {...product};
          _product[`${name}`] = val;
        
          if(editing){
            setProductEditDialog(_product)
          }else{
            setProduct(_product);
          }
        
      }
  
      const leftToolbarTemplate = () => {
          return (
              <React.Fragment>
                  <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
              </React.Fragment>
          )
      }
  
      const actionBodyTemplate = useCallback(rowData => {
          return (
              <React.Fragment>
                  <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                  <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
              </React.Fragment>
          );
      }, [confirmDeleteProduct, editProduct]);
  
      const header = (
          <div className="table-header">
              <h1 className="p-m-0">SOCCER MATHS</h1>
          </div>
      );
      const productDialogFooter = (
          <React.Fragment>
              <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
              <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
          </React.Fragment>
      );

      const productEditDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={updateProduct} />
        </React.Fragment>
    );
      
      const deleteProductDialogFooter = (
          <React.Fragment>
              <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
              <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
          </React.Fragment>
      );

      return (
          <div className="datatable-crud-demo">
              <Toast ref={toast} />
  
              <div className="card">
                  <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
  
                  <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                      dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                      header={header}>
  
                      <Column field="home" header="Home" sortable></Column>
                      <Column field="visit" header="Visit" sortable></Column>
                      <Column field="homeGoals" header="Home G." sortable></Column>
                      <Column field="visitGoals" header="Visit G." sortable></Column>
                      <Column body={actionBodyTemplate}></Column>
                  </DataTable>
              </div>
  
              <Dialog visible={productDialog} 
              style={{ width: '450px' }}
              header="New soccer match"
              modal
              className="p-fluid"
              footer={productDialogFooter} 
              onHide={hideDialog}>
                  <div className="p-field">
                      <label htmlFor="home">Home</label>
                      <InputText id="home" value={product?.home} onChange={(e) => onInputChange(e, 'home')}
                      required autoFocus 
                      className={classNames({ 'p-invalid': submitted && !product?.home })} 
                      />
                      {submitted && !product?.home && <small className="p-error">Home is required.</small>}
                  </div>
                  <div className="p-field">
                      <label htmlFor="visit">Visit</label>
                      <InputText id="visit" value={product?.visit} onChange={(e) => onInputChange(e, 'visit')}
                      required autoFocus 
                      className={classNames({ 'p-invalid': submitted && !product?.visit })} 
                      />
                  </div>
              </Dialog>
  

              <Dialog visible={productEditDialog} 
              style={{ width: '450px' }}
              header="Edit soccer match"
              modal
              className="p-fluid"
              footer={productEditDialogFooter} 
              onHide={hideDialog}>
                  <div className="p-field">
                      <label htmlFor="home">Home</label>
                      <InputText id="home" value={productEditDialog?.home} onChange={(e) => onInputChange(e, 'home', true)}
                      required autoFocus 
                      className={classNames({ 'p-invalid': submitted && !productEditDialog?.home })} 
                      />
                      {submitted && !productEditDialog?.home && <small className="p-error">Home is required.</small>}
                  </div>
                  <div className="p-field">
                      <label htmlFor="visit">Visit</label>
                      <InputText id="visit" value={productEditDialog?.visit} onChange={(e) => onInputChange(e, 'visit', true)}
                      required autoFocus 
                      className={classNames({ 'p-invalid': submitted && !productEditDialog?.visit })} 
                      />
                  </div>
                  <div className="p-field">
                      <label htmlFor="homeGoals">Home Goals</label>
                      <InputText id="homeGoals" value={productEditDialog?.homeGoals} onChange={(e) => onInputChange(e, 'homeGoals', true)}
                      required autoFocus 
                      className={classNames({ 'p-invalid': submitted && !productEditDialog?.homeGoals })} 
                      />
                  </div>
                  <div className="p-field">
                      <label htmlFor="visit">Visit Goals</label>
                      <InputText id="visit" value={productEditDialog?.visitGoals} onChange={(e) => onInputChange(e, 'visitGoals', true)}
                      required autoFocus 
                      className={classNames({ 'p-invalid': submitted && !productEditDialog?.visitGoals })} 
                      />
                  </div>
              </Dialog>

              <Dialog visible={deleteProductDialog}
              style={{ width: '450px' }}
              header="Confirm"
              modal
              footer={deleteProductDialogFooter}
              onHide={hideDeleteProductDialog}>
                  <div className="confirmation-content">
                      <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                      {product && <span>Are you sure you want to delete {product?.home} - {product?.visit}?`</span>}
                  </div>
              </Dialog>
          </div>
      );
};


export default memo(PanelGoalsPage);
