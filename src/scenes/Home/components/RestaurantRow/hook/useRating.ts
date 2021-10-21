import _ from 'lodash'

function useRating(rating?: number, numberOfRating?: number) {
  let formattedNumberOfRating = undefined
  if (numberOfRating) {
    if (numberOfRating >= 999) {
      formattedNumberOfRating = '(999+)'
    } else if (numberOfRating >= 500) {
      formattedNumberOfRating = '(500+)'
    } else if (numberOfRating >= 300) {
      formattedNumberOfRating = '(300+)'
    } else if (numberOfRating >= 100) {
      formattedNumberOfRating = '(100+)'
    } else if (numberOfRating >= 50) {
      formattedNumberOfRating = '(50+)'
    } else if (numberOfRating >= 15) {
      formattedNumberOfRating = '(15+)'
    } else {
      formattedNumberOfRating = `(${_.round(numberOfRating, 0)})`
    }
  }

  let formattedRating = undefined
  if (rating) {
    formattedRating = _.round(rating, 1)
  }

  return [formattedRating, formattedNumberOfRating]
}

export default useRating
