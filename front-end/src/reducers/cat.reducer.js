import { CatConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCat = (id,categories, category) => {
    
    let mycategories = [];
    // if no parentId 
    if(id == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }
    // handling parentId
    for(let cat of categories){

        if(cat._id == id){
            mycategories.push({
                ...cat,
                children: cat.children ? buildNewCat(id, [...cat.children, {
                    _id: category.id, 
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            });
        }
        else{
            mycategories.push({
                ...cat,
                children: cat.children ? buildNewCat(id, cat.children, category) : []
            });
        }

        
    }
    return mycategories;
}


export default (state = initState, action) => {
    switch(action.type){
        case CatConstants.GET_ALL_CAT_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case CatConstants.ADD_NEW_CAT_REQUEST:
            state ={
                ...state,
                loading:true
            }
            break;
        case CatConstants.ADD_NEW_CAT_SUCCESS:

            const category = action.payload.category;
            const updatedCategories = buildNewCat(category.parentId,state.categories, category);
            console.log(updatedCategories)
            state = {
                ...state,
                categories: updatedCategories,
                loading:false
            }
            break;
        case CatConstants.ADD_NEW_CAT_FAILURE:
            state ={
                ...initState
            }
    }
    return state;
}