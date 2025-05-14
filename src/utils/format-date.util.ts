export const formatDate = (iso: string) => new Date(iso).toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
});
