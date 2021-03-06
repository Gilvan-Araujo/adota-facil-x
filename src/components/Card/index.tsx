import {
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Card as MUICard,
  Theme,
  Typography,
  createStyles,
  makeStyles
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import clsx from 'clsx'
import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import { Pet } from 'types'

import Slider from '@components/Slider'

export type CardProps = {
  pet: Pet
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 250
    },
    media: {
      height: 250,
      width: 250
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
)

export default function Card({ pet }: CardProps) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  return (
    <MUICard className={classes.root}>
      <CardHeader
        title={`${pet.name}`}
        subheader={`${pet.age} ${pet.age > 1 ? 'anos' : 'ano'}`}
      />
      <CardMedia className={classes.media} image={pet.image} title={pet.name} />
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          Deslize para mais detalhes
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="mandar mensagem no whatsapp"
          disableRipple
          disableTouchRipple
          disableFocusRipple
        >
          <WhatsAppIcon />
        </IconButton>
        <Slider
          leftCommitted
          leftFunction={() => {
            window.open(pet.phoneContact, '_blank')
          }}
          middleFunction={() => {
            setExpanded(false)
          }}
          rightCommitted={false}
          rightFunction={() => {
            setExpanded(true)
          }}
        />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          aria-expanded={expanded}
          aria-label="mostrar mais"
          disableRipple
          disableTouchRipple
          disableFocusRipple
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            style={{ textTransform: 'capitalize' }}
            paragraph
            variant="body1"
            color="textSecondary"
          >
            Tipo: {pet.type}
          </Typography>
          <Typography
            style={{ textTransform: 'capitalize' }}
            paragraph
            variant="body1"
            color="textSecondary"
          >
            Ra??a: {pet.breed}
          </Typography>
          <Typography
            style={{ textTransform: 'capitalize' }}
            paragraph
            variant="body1"
            color="textSecondary"
          >
            Sexo: {pet.sex}
          </Typography>
          <Typography paragraph variant="body1" color="textSecondary">
            Contato:{' '}
            <NumberFormat
              value={pet.phone}
              displayType="text"
              format="(##) # ####-####"
            />
          </Typography>
          <Typography paragraph variant="body1" color="textSecondary">
            Descri????o: {pet.description}
          </Typography>
        </CardContent>
      </Collapse>
    </MUICard>
  )
}
