import { useState, useEffect, useCallback,useRef } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { ICate } from '../../typings/db';
import AddCategory from './Add';
import EditCategory from './Edit';
import RemoveCategory from './Remove';

const Categories = () => {

  const [ categories, setCategories ] = useState<ICate[]>([]);
  const [ categoriesname, onChangeCategoriesname ] = useInput('');
  const [ categoriesstatus, onChangeCategoriesstatus ] = useInput('');
  const formRef = useRef<HTMLDivElement>(null);
  const [ name, setName ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ id, setId ] = useState('');

  const addSubmit = useCallback((e) => {
    e.preventDefault();
    const form = formRef.current;
    axios
      .post('api/products/category',{
        categoriesname,
        categoriesstatus
      })
      .then((response) => {
        if(response.statusText !== 'OK') {
          throw new Error(response?.data.message);
        }
        form && form.classList.add('has-success');
      })
      .catch((error) => {
        throw error.response?.data?.statusCode;
      })

  },[categoriesname, categoriesstatus]);

  const editSubmit = useCallback((e) => {
    console.log(name, status, id)
    e.preventDefault();
    //document.querySelector('#editBrandModel')?.classList.add('div-hide'); 
    axios
      .put(`api/products/category/${id}`, {
        name, 
        status
      })
      .then((response) => {
        if(response.statusText !== 'OK' || response.data.message) {
          throw new Error(response?.data.message);
        }
      })
      .catch((error) => {
        //setAddBrandError(true);
        throw error.response?.data?.statusCode;
      })
    return false;
  },[name, status, id])

  const editClick = useCallback((id: number) => {
    axios
    .get(`api/products/category/${id}`)
    .then((response) => {
      if(response.statusText !== 'OK') {
        //setAddBrandError(true)
        throw new Error(response.data.message);
      }
      setName(response.data[0].categories_name)
      setStatus(response.data[0].categories_active)
      setId(response.data[0].categories_id)
    })
    .catch((error) => {
      //setAddBrandError(true)
      return { error: error.response.data.message || error.message };
    }) 
  },[])

  const removeClick = useCallback(() => {
    axios
    .get(`api/products/category/remove/${id}`)
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      // 데이터를 받아온 후 처리해야할 부분(자동 새로고침)
      //console.log(mutate('api/products/brand'))
      //return mutate('api/products/brand'); // 서버로부터 재요청 || 캐싱된 데이터
    })
    .catch((error) => {
      console.log(error);
      return { error: error.response.data.message || error.message };
    }) 
  },[id])

  useEffect(() => {
    axios
    .get('api/products/category')
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return setCategories(response.data)
    })  
    .catch((error) => {
        return { error: error.response.data.message || error.message };
    })
  },[setCategories])
  console.log(id)
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-12">

        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>		  
          <li className="active">Category</li>
        </ol>

        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="page-heading"> <i className="glyphicon glyphicon-edit"></i> Manage Categories</div>
          </div> {/*<!-- /panel-heading -->*/}
          <div className="panel-body">

            <div className="remove-messages"></div>

            <div className="div-action pull pull-right" style={{ paddingBottom: '20px' }}>
              <button className="btn btn-default button1" data-toggle="modal" id="addCategoriesModalBtn" data-target="#addCategoriesModal"> <i className="glyphicon glyphicon-plus-sign"></i> Add Categories </button>
            </div> {/*<!-- /div-action -->*/}				
            
            <table className="table" id="manageCategoriesTable">
              <thead>
                <tr>							
                  <th>Categories Name</th>
                  <th>Status</th>
                  <th style={{ width: '15%' }}>Options</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cat) => {
                  return (
                    <tr key={cat.categories_id}>
                      <td>{cat.categories_name}</td>
                      <td>{cat.categories_active === 1 ?
                      <label className='label label-success'>Available</label> : <label className='label label-danger'>Not Available</label>
                      }</td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Action <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu">
                            <li><button onClick={() => editClick(cat.categories_id)} type='button' data-toggle="modal" data-target="#editCategoriesModal" > <i className="glyphicon glyphicon-edit"></i> Edit</button></li>
                            <li><button onClick={() => setId(String(cat.categories_id))} type='button' data-toggle="modal" data-target="#removeCategoriesModal"> <i className="glyphicon glyphicon-trash"></i> Remove</button></li>       
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
            {/*<!-- /table -->*/}
          </div> {/*<!-- /panel-body -->*/}
        </div> {/*<!-- /panel -->*/}		
      </div> {/*<!-- /col-md-12 -->*/}
    </div> {/*<!-- /row -->*/}

    {/*<!-- add categories -->*/}
    <AddCategory 
      addSubmit={addSubmit} 
      categoriesname={categoriesname}
      onChangeCategoriesname={onChangeCategoriesname}
      categoriesstatus={categoriesstatus}
      onChangeCategoriesstatus={onChangeCategoriesstatus} 
      formRef={formRef}
    />          

    {/*<!-- edit categories -->*/}
    <EditCategory editSubmit={editSubmit} name={name} setName={setName} status={status} setStatus={setStatus} />

    {/*<!-- remove categories -->*/}
    <RemoveCategory removeClick={removeClick} />         
    {/*<!-- remove categories brand -->*/}
    </div>
  )
}

export default Categories

