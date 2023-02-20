from django.db.models.signals import pre_save
from django.contrib.auth.models import User


def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)

from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order

@receiver(post_save, sender=Order)
def send_order_email(sender, instance, created, **kwargs):
    order_id = instance.id
    from_email = 'johndoe@example.com'

    if created:
        subject = f'Your order #{order_id} has been received!'
        message = f'Thank you for your order. We will update you when it is ready for delivery. You can view your order details here:\n\nhttp://localhost:3000/order/{order_id}'

        recipient_list = [instance.user.email, from_email] 
        send_mail(subject, message, from_email, recipient_list)
    elif instance.cancelled:
            subject = f'Your order #{order_id} has been cancelled successfully.'
            message = f"You've request for your order #{order_id} to be cancelled has been completed!\nIf you think this was a mistake contact support through this mail."

            recipient_list = [instance.user.email, from_email] 
            send_mail(subject, message, from_email, recipient_list)
    else:
        if instance.is_paid:
            subject = f'Thank you for the payment for order #{order_id}!'
            message = f'Your order #{order_id} has successfully been paid! Hope you shop again soon! Paid at: {str(instance.paid_at)[0:-6]}.\n\nYou can view your order details here: http://localhost:3000/order/{order_id}'
        elif instance.is_delivered:
            subject = f'Your order #{order_id} has been delivered!'
            message = f'We hope you enjoy your purchase. Please let us know if you have any issues. Delivered at: {str(instance.delivered_at)[0:-6]}.\n\nYou can view your order details here: http://localhost:3000/order/{order_id}'
        elif instance.delivery_eta:
            subject = f'Your order has #{order_id} a new delivery estimate!'
            message = f'Your order is now estimated to arrive on {str(instance.delivery_eta)[0:-6]}. We will notify you if this changes.\n\nYou can view your order details here: http://localhost:3000/order/{order_id}'
        else:
            return
        
        recipient_list = [instance.user.email, from_email] 
        send_mail(subject, message, from_email, recipient_list)