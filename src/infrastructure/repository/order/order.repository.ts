
import OrderModel from "../../db/sequelize/model/order.model";
import Order from "../../../domain/entity/order/order";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import OrderItem from "../../../domain/entity/order/order_item";

export default class OrderRepository {
    async create(entity: Order): Promise<void> {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    }

    async update(entity: Order): Promise<void> {
        try {

            const sequelize = OrderModel.sequelize;
            await sequelize.transaction(async (t) => {
              await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
              });
              const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
              }));
              await OrderItemModel.bulkCreate(items, { transaction: t });
              await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id }, transaction: t }
              );
            });            

        } catch (error) {
          console.log(error);
          throw new Error("Failed to update order");
        }
      }

      async find(id: string): Promise<Order>{

        let orderModel;

        try{
            orderModel =  await OrderModel.findOne({
                where: { id: id },
                include: ["items"],
              });

        } catch(error){
            throw new Error("Order not found")
        }

        const items = orderModel.items.map((item) => {
            let orderItem = new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);
            return orderItem;
        });
        
        const order = await new Order(orderModel.id, orderModel.customer_id, items);
        return order;
      }
      
      async findAll(): Promise<Order[]>{       
        
        let orderModels;

        try{

            orderModels =  await OrderModel.findAll({
                include: ["items"]
              });

        } catch(error){
            throw new Error("Orders not found");
        }

        const orders = orderModels.map((orderModels) => {


            let items = orderModels.items.map((item) => {
                let orderItem = new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);
                return orderItem;
            });

            let order = new Order(orderModels.id, orderModels.customer_id, items);

            return order;
          });

        return orders;
      }
}


    
