import { CatConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCat = (id,categories, category) => {
    
    let mycategories = [];
    // if no parentId (Parent Category) 
    if(id == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }
    // handling parentId (children)
    for(let cat of categories){

        const newCat = {
            _id: category.id, 
            name: category.name,
            slug: category.slug,
            parentId: category.parentId,
            type: category.type,
            children: []
        }

        if(cat._id == id){
            mycategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCat] : [newCat]
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
                ...initState,
                loading: false,
                error: action.payload.error
            }
            break;
        case CatConstants.UPDATE_CAT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case CatConstants.UPDATE_CAT_SUCCESS:
            state = {
             ...state,
             loading: false
            }
            break;
        case CatConstants.UPDATE_CAT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case CatConstants.DELETE_CAT_REQUEST:
            state  = {
                ...state,
                loading: true
            }
            break;
        case CatConstants.DELETE_CAT_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case CatConstants.DELETE_CAT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state;
}