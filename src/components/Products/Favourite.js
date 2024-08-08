import React, { useState } from 'react'
// import { ReactComponent as FavouriteIcon } from '../../utils/svg/fav.svg'
// import { ReactComponent as NonFavouriteIcon } from '../../utils/svg/non-fav.svg'
import { markAsFavourate } from '../../service/products'
import { Button } from 'react-bootstrap'

export const Favourite = ({ isFavourite, id }) => {
    const [isFav, setIsFav] = useState(!!isFavourite)

    const onClick = async () => {
        try {
            setIsFav(original => !original);
            [...Array(10).keys()].forEach(() => {
                try {
                    markAsFavourate(id, !isFav).catch((e) => console.log(e.message))
                } catch {
                }
            })
        } catch {
            setIsFav((revert) => !revert)
        }
    }
    return (
        <Button onClick={onClick} title={isFav ? "Remove from favourite" : "Mark as favourite"} style={{ zIndex: 2, position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
            {isFav ? "Not-Fav" : "Fav"}
        </Button>
    )
}
