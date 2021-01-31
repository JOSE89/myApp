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
  
    const [soccerMatch, setSoccerMatch] = useState('');
    const [soccerMatchs, setSoccerMatchs] = useState([]);
    const [showNewSoccerDialog, setShowNewSoccerDialog] = useState(false);
    const [deleteSoccertDialog, setDeleteSoccerDialog] = useState(false);
    const [selectedMatchs, setSelectedMatchs] = useState(null);
    const [soccerMatchEditDialog, setSoccerMatchEditDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const dt = useRef(null);

    useEffect(() => {
        setSoccerMatchs(results);
        setSoccerMatchEditDialog(false);
    }, [results]);

      const openNew = useCallback(() => {
          setSubmitted(false);
          setShowNewSoccerDialog(true);
      }, []);
  
      const editProduct = useCallback(soccerMatch => {
          setSoccerMatchEditDialog({...soccerMatch})
      }, []);
  
      const confirmDeleteProduct = useCallback(soccerMatch => {
          setSoccerMatch(soccerMatch);
          setDeleteSoccerDialog(true);
      }, []);
  
      const onInputChange = useCallback((e, name, editing) => {
          const val = (e.target && e.target.value) || '';
          let _product = editing ? {...soccerMatchEditDialog} : {...soccerMatch};
          _product[`${name}`] = val;
        
          if(editing){
            setSoccerMatchEditDialog(_product)
          }else{
            setSoccerMatch(_product);
          }        
      }, [soccerMatch, soccerMatchEditDialog]);
  
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
  
                  <DataTable ref={dt} value={soccerMatchs} selection={selectedMatchs} onSelectionChange={(e) => setSelectedMatchs(e.value)}
                      dataKey="id"
                      paginator = {soccerMatchs?.length > 5 ? true : false}
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
        
            {showNewSoccerDialog && <NewSoccerDialog 
                soccer = {soccerMatch} setSoccerMatch={setSoccerMatch}
                submitted={submitted} setSubmitted={setSubmitted}
                showNewSoccerDialog = {showNewSoccerDialog} setShowNewSoccerDialog={setShowNewSoccerDialog}
                onInputChange={onInputChange}/>}
                
            {soccerMatchEditDialog && <EditSoccerDialog 
                soccerMatchEditDialog = {soccerMatchEditDialog}
                setSoccerMatchEditDialog = {setSoccerMatchEditDialog}
                setSoccerMatch={setSoccerMatch}
                submitted={submitted} setSubmitted={setSubmitted}
                onInputChange={onInputChange}/>}

            {deleteSoccertDialog && <DeleteSoocerDialog
                setSubmitted={setSubmitted}
                deleteSoccertDialog= {deleteSoccertDialog}
                setDeleteSoccerDialog = {setDeleteSoccerDialog}
                soccer = {soccerMatch}/>
                }
          </div>
      );
};

export default memo(PanelGoalsPage);
