import React, { useEffect } from 'react'
import {useQuery, gql} from '@apollo/client'
import {LOAD_CATEGORIES} from '../GrafpQL/Queries'
import AppBar from './AppBar';

function Categories() {
    const {error, loading, data} = useQuery(LOAD_CATEGORIES);
    useEffect(()=> {
     console.log(data)
    }, [data])
  return (
    <div><AppBar/></div>
  )
}

export default Categories
