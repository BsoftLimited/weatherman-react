import getUserLocation, { openWeatherAPI, openWeatherImages } from "./connections";

export { openWeatherAPI, openWeatherImages, getUserLocation };

export const apiKey = "5339176bef3c8725c8a9c64ccb7d985f";

/*const fetchImages = useCallback(() => {
        setState((init) => { return {...init, loading: true, error: undefined}});
        searchPhoto(query, state.page).then((response)=>{
            console.log('data', response.data);
            setData((init)=>{
                let images = init.images;
                images.set(state.page, response.data.results);

                return { images, totalPages: response.data.total_pages, total: response.data.total };
            });
            setState((init) => { return {...init, loading: false, error: undefined}});
        }).catch((error)=>{
            console.log(error);
            setState((init) => { return {...init, loading: false, error: 'Error fetching images. Try again later.'}});
        });
    }, [state.page]);

    useEffect(()=> fetchImages(), [fetchImages]);*/