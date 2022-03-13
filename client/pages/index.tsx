import React, { Component } from "react";
import {Button} from "@material-ui/core";
import Navbar from  "../components/Navbar";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/IndexPage.module.css";

const Index = () => {
    
    return (
    <>className={styles.body}   

        <MainLayout> 

        < div className={styles.center} >
          <h1>Welcome</h1>
          
            <h3>This is place for good music</h3>
        </div>

        </MainLayout>

    </>

    );
};

export default Index;