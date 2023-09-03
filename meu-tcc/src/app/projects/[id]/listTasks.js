import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight'; // Importe o ícone ArrowRight do Material-UI
import { MoreVert } from '@mui/icons-material';

const ListTasks = (props) => {
  const { products = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const updatedAtDistance = new Date(product)

          return (
            <ListItem divider={hasDivider} key={product.id}>
              <ListItemAvatar>
                {
                  product.image ? (
                    <Box
                      component="img"
                      src={product.image}
                      sx={{
                        borderRadius: 1,
                        height: 48,
                        width: 48,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: 'neutral.200',
                        height: 48,
                        width: 48,
                      }}
                    />
                  )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${updatedAtDistance} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  {/* Substitua EllipsisVerticalIcon pelo ícone desejado */}
                  {/* Por exemplo, você pode usar MoreVertIcon do Material-UI */}
                  <MoreVert />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

ListTasks.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};

export default ListTasks;

